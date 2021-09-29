const main = async () => {
    const [judicodes, waiver] = await hre.ethers.getSigners();
    const WaveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const WaveContract = await WaveContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.01'),
    });
    await WaveContract.deployed();


    console.log("Contract Deployed to: ", WaveContract.address);
    // console.log("Contract Deployed by: ", judicodes.address);



    // get contract ballance
    let contractBalance = await hre.ethers.provider.getBalance(WaveContract.address);
    console.log("Judi's Balance ", hre.ethers.utils.formatEther(contractBalance))



    // get number of waves
    let waves;
    waves = await WaveContract.getTotalWaves();
    console.log(waves.toNumber())

    // send wave
    let wave = await WaveContract.wave("Hi, Judi just waved!");
    await wave.wait();



    // get contract ballance to see what happened
    contractBalance = await hre.ethers.provider.getBalance(WaveContract.address);
    console.log("Judi's Balance again", hre.ethers.utils.formatEther(contractBalance))

    // waves = await WaveContract.getTotalWaves();

    wave = await WaveContract.connect(waiver).wave("Hey, How are you!");
    await wave.wait();
   

    // waves = await WaveContract.getTotalWaves();
    // console.log(waves)

    let allWaves = await WaveContract.getAllWaves();
    console.log(allWaves);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    }catch(error){
        console.log(error);
        process.exit(1);
    }
};

runMain();