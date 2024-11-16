// CJS 방식
require('dotenv').config();
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001;

const { FAUCET_TOKEN_AMOUNT, TOKEN_DECIMALS } = require('./utils/constants')
const { erc20Abi } = require('viem');
const { walletClient, adminAccount } = require('./utils/accounts')

const { config } = require('./utils/server-wagmi');

// **abi**는 스마트 계약의 함수와 데이터 구조를 설명하며, 호출할 함수와 전달할 인자 등을 정의합니다.
// **config**는 특정 네트워크에 배포된 스마트 계약과 상호작용할 때 필요한 설정 정보(네트워크, 계약 주소 등)를 제공합니다.

app.use(express.static('public'));

let canMint = {}

app.use(cors())

// ----------------------------------------------------------------------------------------------------- 여기부터

app.get('/mint', async (req, res) => {
    const address = req.query.address;
    console.log("addrsss: ", address);

    if (!(address in canMint)) {
        canMint[address] = true;
    }

    if (canMint[address] === false) {
        res.json({
            msg: "쿨다운",
        })
        return
    }
    else {
        const hash = await walletClient.writeContract({
            address: process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS, // ERC-20 토큰 컨트랙트 주소
            abi: [{
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "mint",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }],
            functionName: 'mint',
            args: [address, FAUCET_TOKEN_AMOUNT * 10 ** TOKEN_DECIMALS],
            account: adminAccount,
        })

        canMint[address] = false;
        setTimeout(() => {
            canMint[address] = true;
        }, 1000 * 10);

        res.json({
            msg: "성공",
            hash: hash,
            amount: FAUCET_TOKEN_AMOUNT
        })
    }


})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

})