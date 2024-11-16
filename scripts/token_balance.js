async function main() {
    const TestToken = await ethers.getContractFactory("TestToken");
    const testToken = TestToken.attach("0x204d33b136310468765eD8E4609Ad0264426584A");

    const [deployer, addr1, addr2] = await ethers.getSigners();
    console.log(addr1.address, " and ", addr2.address)

    try {
        const balance1 = await testToken.balanceOf(addr1.address);
        const balance2 = await testToken.balanceOf(addr2.address);

        console.log(`Balance of addr1: ${balance1.toString()}`);
        console.log(`Balance of addr2: ${balance2.toString()}`);
    } catch (error) {
        console.error("Error fetching balances:", error); // 더 자세한 오류 메시지 출력
        process.exit(1);
    }

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
