import 'dotenv/config';

async function distribute(contractAddress, contractName, toAddress, amount) {
  // const [deployer, addr1, addr2] = await ethers.getSigners();

  const testTokenAddress = contractAddress; // 배포된 컨트랙트 주소
  const TestToken = await ethers.getContractFactory(contractName);
  const testToken = TestToken.attach(testTokenAddress);

  console.log("Minting tokens to addresses...");

  // await testToken.mint(addr1.address, ethers.parseUnits("1000", 16));
  await testToken.mint(toAddress, amount);
  console.log(`Distributed ${amount} tokens to ${toAddress}`);
}

let recipientAddress = "0x204d33b136310468765eD8E4609Ad0264426584A";
let amount = ethers.parseUnits("100", 18);

distribute(
  process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS,
  process.env.NEXT_PUBLIC_TOKEN_CONTRACT_NAME,
  recipientAddress,
  amount)
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

  