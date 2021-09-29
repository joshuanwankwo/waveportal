const main = async () => {
    // const [judicodes] = await hre.ethers.getSigners();
    // const accountBalance = await judicodes.getBalance();

    // console.log("Deploying contracts with account", judicodes.address);
    // console.log("Account balance:", accountBalance.toString());

    const WaveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await WaveContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.09')
    });

    await waveContract.deployed();

    console.log("Deployed WavePortal at", waveContract.address);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        process.exit(1);
        console.error(error);
    }
}

runMain();