import { useEffect } from "react";
import Moralis from 'moralis';
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import Account from "components/Account";
import Chains from "components/Chains";
import NFTBalance from "components/NFTBalance";
import NFTMint from "components/NFTMint";
import { Menu, Layout} from "antd";
import "antd/dist/antd.css";
import "./style.css";
import NativeBalance from "components/NativeBalance";

const { Header } = Layout;

const styles = {
  content: {
  //  display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    //background: "#242b3b",
    marginTop: "130px",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};

const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading, user } = useMoralis();
  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  async function uploadNFT(metadata){
    window.alert("Confirm uploading data to Rarible by clicking OK. DON'T REFRESH THE PAGE!!!")

    const imageFile = new Moralis.File(metadata.image.name, metadata.image)
    const stlFile = new Moralis.File(metadata.file.name, metadata.file, "model/stl")
    await imageFile.saveIPFS();
    await stlFile.saveIPFS();
    let imageFileHash = imageFile.hash();
    let stlFileHash = stlFile.hash();
    // let imageFileUrl = imageFile.url();
    // let stlFileUrl = stlFile.url();
    // console.log(imageFileHash)
    // console.log(stlFileHash)
    // console.log(imageFileUrl)
    // console.log(stlFileUrl)

    let Metadata = {
      name: metadata.name,
      creator: metadata.creator,
      category: metadata.category,
      supply: metadata.supply,
      description: metadata.description,
      royalty: metadata.royalty,
      image: "/ipfs/" + imageFileHash,
      file: "/ipfs/" + stlFileHash
    }
    console.log(Metadata)

    const jsonFile = new Moralis.File("Metadata.json", {base64 : btoa(JSON.stringify(Metadata))}); // btoa deprecated but still works so fuck it?
    await jsonFile.saveIPFS();
    // console.log(jsonFile)

    let metadataHash = jsonFile.hash();
    // console.log(jsonFile.ipfs())

    let res = await Moralis.Plugins.rarible.lazyMint({
      chain: 'rinkeby',
      userAddress: user.get('ethAddress'),
      tokenType: 'ERC1155',
      tokenUri: 'ipfs://' + metadataHash,
      supply: metadata.supply,
      royaltiesAmount: metadata.royalty * 100 // 5 = 0.05% royalty. Optional
    })

    // console.log(res);
    if (window.confirm('Click OK to list NFT on Rarible! ')) 
    {window.location.href=`https://rinkeby.rarible.com/token/${res.data.result.tokenAddress}:${res.data.result.tokenId}`}
  }

  return (
    <section>
    <Layout class="bg-overlay bg-gradient-primary opacity-6" style={{ height: "100vh", overflow: "auto"}}>
      <Router>
        <Header style={styles.header}>
          <Logo />
          <Menu
            theme="light"
            mode="horizontal"
            style={{
              display: "flex",
              fontSize: "17px",
              fontWeight: "500",
              marginLeft: "400px",
              width: "100%",
            }}
            defaultSelectedKeys={["nftMint"]}
            >
            <Menu.Item key="nftMint">
              <NavLink to="/nftMint">Lazy Mint on Rarible</NavLink>
            </Menu.Item>
            <Menu.Item key="nft">
              <NavLink to="/nftBalance">Your Collection</NavLink>
            </Menu.Item>
          </Menu>
          <div style={styles.headerRight}>
            <Chains />
            <NativeBalance />
            <Account />
          </div>
        </Header>
        <div style={styles.content}>
          <Switch>
            <Route exact path="/nftMint">
              <NFTMint onAdd={uploadNFT}/>
            </Route>
            <Route path="/nftBalance">
              <NFTBalance />
            </Route>
          </Switch>
          <Redirect to="/nftMint" />
        </div>
      </Router>
    </Layout>
    </section>
  );
};

export const Logo = () => (
  <div style={{ display: "flex" }}>
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="72pt" height="72pt" viewBox="0 0 2386.000000 1642.000000" preserveAspectRatio="xMidYMid meet">

      <g transform="translate(0.000000,1642.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
        <path 
          d="M6223 14910 l-2173 -5 -24 -25 c-14 -14 -491 -941 -1059 -2061 -1405 -2765 -1281 -2517 -1269 -2544 14 -29 47 -37 72 -17 11 10 483 931 1050 2047 669 1316 1042 2042 1063 2063 17 18 47 37 67 43 23 7 1047 9 3120 7 l3085 -3 57 -27 c117 -54 201 -164 217 -284 8 -56 2 -136 -15 -179 -4 -11 -396 -784 -871 -1718 -475 -933 -863 -1708 -863 -1721 0 -31 22 -48 56 -44 26 3 84 114 906 1728 483 948 891 1737 906 1753 94 101 286 102 385 1 39 -39 34 -28 409 -764 1117 -2185 1338 -2626 1349 -2689 13 -72 0 -160 -33 -225 -33 -65 -112 -141 -181 -172 l-62 -29 -2035 -7 c-1119 -4 -2451 -7 -2960 -5 l-925 2 -54 28 c-29 16 -72 47 -94 70 -31 33 -249 452 -1017 1962 -912 1792 -979 1920 -1004 1923 -34 4 -56 -13 -56 -43 0 -12 446 -899 992 -1971 546 -1072 1009 -1988 1030 -2036 20 -48 42 -117 48 -155 6 -37 16 -84 21 -103 11 -46 68 -112 116 -136 37 -18 127 -19 3018 -24 l2980 -5 55 -26 c80 -37 125 -81 162 -157 29 -58 33 -75 32 -142 -1 -52 -8 -89 -22 -120 -74 -164 -1727 -3392 -1752 -3423 -17 -20 -55 -49 -83 -64 -107 -54 -252 -26 -327 64 -17 21 -423 808 -902 1750 -594 1169 -876 1714 -889 1718 -24 8 -56 -10 -64 -35 -5 -15 232 -489 864 -1733 478 -941 875 -1734 882 -1760 39 -158 -55 -343 -209 -415 l-57 -27 -2912 0 -2912 0 -28 21 c-41 31 -66 80 -66 128 1 35 153 340 947 1901 520 1022 946 1867 946 1877 0 10 -11 25 -25 34 -22 15 -27 15 -47 2 -15 -10 -384 -728 -1072 -2084 -1097 -2164 -1069 -2106 -1052 -2197 11 -59 62 -123 119 -152 l53 -25 3214 2 3215 3 77 22 c259 74 474 226 610 434 67 102 2155 4205 2191 4306 45 124 60 231 54 388 -5 145 -23 233 -69 345 -17 43 -1126 2229 -2034 4009 -135 265 -187 344 -293 444 -143 135 -287 211 -501 264 -77 20 -819 22 -4357 13z"
        />
        <path 
          d="M13023 14891 c-61 -21 -124 -62 -160 -105 -23 -27 -641 -1262 -658 -1314 -6 -21 23 -62 44 -62 27 0 63 64 197 348 166 352 173 362 268 370 65 5 125 -22 154 -70 11 -18 475 -927 1031 -2020 1096 -2155 1034 -2023 992 -2107 -40 -78 -21 -75 -524 -81 -429 -5 -449 -6 -463 -24 -19 -27 -18 -42 6 -66 19 -19 33 -20 451 -20 481 0 478 0 525 -69 17 -26 24 -49 24 -85 0 -45 -77 -200 -1021 -2055 -561 -1103 -1028 -2014 -1037 -2025 -28 -31 -69 -46 -122 -46 -55 0 -94 15 -125 50 -11 12 -90 160 -175 328 -130 257 -159 308 -178 310 -30 4 -52 -14 -52 -43 0 -26 602 -1215 649 -1281 36 -52 104 -102 169 -126 44 -16 251 -17 3188 -18 2763 0 3151 2 3221 15 273 52 505 201 667 429 49 68 2142 4174 2193 4301 47 119 66 221 66 365 1 138 -11 214 -52 335 -31 93 -2129 4222 -2199 4329 -152 230 -402 393 -681 441 -72 13 -506 15 -3215 15 -2987 -1 -3133 -1 -3183 -19z m4667 -480 l1355 -6 63 -34 c149 -81 227 -242 193 -401 -10 -45 -697 -1409 -1669 -3312 -76 -150 -84 -170 -74 -193 9 -18 19 -25 41 -25 16 0 33 6 39 13 6 7 401 780 877 1717 959 1887 899 1780 1015 1814 106 31 197 10 271 -62 43 -42 140 -228 941 -1797 491 -962 901 -1775 911 -1805 15 -42 18 -72 14 -127 -10 -133 -80 -239 -199 -304 l-63 -34 -2698 -5 c-2657 -5 -2699 -5 -2713 -24 -19 -27 -18 -42 6 -66 20 -20 33 -20 2738 -20 l2717 0 60 -28 c65 -31 121 -86 157 -154 19 -36 23 -58 23 -138 l0 -95 -682 -1335 c-375 -734 -790 -1546 -922 -1805 -132 -258 -254 -487 -271 -508 -77 -92 -216 -118 -326 -62 -31 17 -70 46 -85 65 -15 19 -417 800 -893 1734 -476 935 -874 1708 -884 1719 -24 24 -59 15 -74 -18 -9 -21 89 -219 853 -1722 475 -934 871 -1720 881 -1748 59 -169 -34 -367 -209 -448 l-48 -22 -2610 -3 c-2400 -3 -2615 -2 -2672 14 -116 30 -216 127 -257 247 -18 54 -21 154 -5 210 5 20 472 945 1037 2055 l1027 2017 0 80 0 80 -1027 2016 c-565 1109 -1032 2037 -1039 2063 -17 70 -7 171 26 244 45 101 155 191 258 212 49 9 1973 10 3917 1z"
        />
        <path 
          d="M1596 9840 c-56 -17 -96 -73 -96 -136 0 -29 215 -461 1035 -2078 570 -1123 1042 -2047 1050 -2055 18 -18 61 -7 75 20 10 17 1 40 -53 147 -35 70 -482 947 -992 1950 l-927 1823 4 60 c5 67 38 118 98 150 33 18 107 19 2070 19 1677 0 2039 2 2054 13 21 15 25 62 7 80 -14 14 -4278 21 -4325 7z"
        />
        <path 
          d="M3974 2837 c-2 -7 -3 -87 -2 -177 l3 -165 193 -3 194 -2 -106 -86 -106 -85 0 -148 0 -149 203 -4 c219 -4 240 -9 265 -64 15 -31 16 -119 2 -145 -23 -42 -121 -68 -190 -49 -65 17 -100 58 -100 114 l0 46 -196 0 -197 0 7 -75 c12 -135 56 -226 154 -317 185 -174 520 -189 732 -32 157 116 222 301 175 502 -32 134 -121 255 -224 303 -28 13 -50 26 -50 29 0 3 54 47 119 99 l120 94 0 164 0 163 -495 0 c-395 0 -497 -3 -501 -13z m936 -167 l0 -110 -166 -132 -165 -133 69 -16 c126 -29 208 -95 265 -218 27 -57 32 -79 35 -168 5 -121 -10 -177 -68 -254 -75 -100 -185 -161 -328 -182 -256 -37 -508 128 -538 351 l-7 52 132 0 131 0 0 -26 c0 -76 97 -144 206 -144 177 0 258 103 209 266 -31 104 -79 124 -300 124 l-165 0 0 105 0 105 166 132 165 133 -255 3 -256 2 0 110 0 110 435 0 435 0 0 -110z"
        />
        <path 
          d="M5310 2150 l0 -701 393 3 c377 4 395 5 462 27 126 41 203 89 295 181 150 149 217 322 207 530 -15 309 -196 544 -487 631 -71 22 -95 23 -472 27 l-398 3 0 -701z m834 610 c224 -57 382 -218 442 -450 24 -96 16 -272 -18 -367 -54 -151 -165 -278 -310 -353 -123 -64 -165 -70 -550 -70 l-338 0 0 630 0 630 348 0 c315 0 356 -2 426 -20z"
        />
        <path 
          d="M5630 2150 l0 -382 223 4 c245 3 270 9 358 79 166 132 184 403 38 564 -30 32 -73 65 -107 82 -57 28 -59 28 -284 31 l-228 3 0 -381z m488 284 c56 -28 100 -72 134 -137 19 -35 23 -58 23 -142 0 -84 -4 -107 -23 -146 -30 -61 -86 -116 -147 -145 -47 -22 -62 -24 -232 -24 l-183 0 0 310 0 310 188 0 c182 0 190 -1 240 -26z"
        />
        <path 
          d="M7050 2150 l0 -650 160 0 160 0 0 134 0 134 178 4 c149 4 187 8 241 27 213 74 351 264 351 486 0 261 -168 471 -405 505 -38 5 -208 10 -377 10 l-308 0 0 -650z m670 300 c116 -59 132 -235 29 -313 -50 -37 -100 -47 -246 -47 l-133 0 0 190 0 190 155 0 c137 0 161 -2 195 -20z"
        />
        <path 
          d="M8578 2794 c-5 -4 -8 -297 -8 -651 l0 -643 160 0 160 0 0 160 0 160 114 0 114 0 104 -160 103 -159 198 -1 199 0 -35 48 c-19 26 -82 112 -140 192 l-107 145 33 25 c60 46 117 110 143 161 92 182 54 424 -90 577 -60 64 -108 96 -185 125 -52 19 -82 21 -406 25 -192 2 -353 0 -357 -4z m655 -340 c70 -35 107 -95 107 -170 0 -67 -32 -118 -94 -149 -47 -23 -60 -25 -203 -25 l-153 0 0 180 0 180 155 0 c124 0 163 -3 188 -16z"
        />
        <path 
          d="M10147 2794 c-4 -4 -7 -297 -7 -651 l0 -643 160 0 160 0 -2 648 -3 647 -151 3 c-82 1 -153 -1 -157 -4z"
        />
        <path 
          d="M10970 2150 l0 -650 155 0 155 0 0 380 c0 209 3 380 8 379 4 0 148 -171 321 -380 l314 -379 158 0 159 0 -2 648 -3 647 -155 0 -155 0 -3 -399 -2 -398 -321 401 -321 401 -154 0 -154 0 0 -650z"
        />
        <path 
          d="M12634 2787 c-2 -7 -3 -71 -2 -143 l3 -129 243 -3 242 -2 0 -505 0 -505 160 0 160 0 0 505 0 505 245 0 246 0 -3 143 -3 142 -643 3 c-522 2 -644 0 -648 -11z"
        />
        <path 
          d="M14300 2153 c-176 -355 -320 -648 -320 -650 0 -1 79 -3 175 -3 l175 0 45 90 45 90 311 0 310 0 41 -90 41 -90 174 0 c95 0 173 3 173 6 0 8 -602 1267 -613 1282 -7 8 -44 12 -123 12 l-114 0 -320 -647z m527 -27 c46 -98 83 -182 83 -187 0 -5 -81 -9 -181 -9 -106 0 -179 4 -177 9 2 5 41 97 88 204 65 150 87 191 94 178 6 -9 47 -96 93 -195z"
        />
        <path 
          d="M15927 2793 c-4 -3 -7 -296 -7 -650 l0 -644 413 3 c405 3 413 3 470 26 79 32 168 116 207 195 68 141 54 316 -34 432 l-24 31 25 74 c34 101 30 226 -9 312 -54 117 -163 196 -298 218 -71 11 -733 14 -743 3z m738 -286 c60 -60 59 -134 -1 -186 l-35 -31 -194 0 -195 0 0 125 0 125 196 0 196 0 33 -33z m60 -510 c61 -61 53 -159 -18 -211 -26 -19 -45 -21 -248 -24 l-219 -3 0 135 0 136 226 0 226 0 33 -33z"
        />
        <path 
          d="M17500 2150 l0 -650 560 0 560 0 0 155 0 155 -405 0 -405 0 0 495 0 495 -155 0 -155 0 0 -650z"
        />
        <path 
          d="M19077 2793 c-4 -3 -7 -296 -7 -650 l0 -643 490 0 490 0 0 140 0 140 -330 0 -330 0 0 115 0 115 260 0 261 0 -3 138 -3 137 -257 3 -258 2 0 110 0 110 330 0 331 0 -3 143 -3 142 -481 3 c-264 1 -484 -1 -487 -5z"
        />
      </g>
    </svg>
  </div>
);

export default App;