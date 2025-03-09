// import 'dotenv/config'; import 대신 require 사용 (CommonJS 모드 유지)
require('dotenv').config();

async function main(contractName) {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  try {
    const TestToken = await ethers.getContractFactory(contractName); // 컨트랙트 컴파일 된 파일 가져옴
    const testToken = await TestToken.deploy(process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS); // ethers.parseUnits("1000", 18) abi 동작 코드를 네트워크(블록체인)로 배포
    console.log("contract deployed to: ", testToken.target); // target: 배포된 컨트랙트 주소
  }
  catch (error) {
    console.log(error && error.message)
  }
}


main(process.env.NEXT_PUBLIC_TOKEN_CONTRACT_NAME)
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });