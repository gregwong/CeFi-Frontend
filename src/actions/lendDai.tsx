import { AppContextState } from "./../context/app";
import { mintZDai } from "./../models/Contracts";
import { globalDecimals } from "./../util/constants";

const supplyDai = async (
  setProcessing: any,
  amount: number,
  primaryAddress: string,
  lendingPoolContract: any,
  zDaiContract: any,
  web3State: any
): Promise<any> => {
  const mint: any = await mintZDai(
    setProcessing,
    lendingPoolContract,
    web3State,
    primaryAddress,
    amount,
  );
  const balance = await zDaiContract.methods.balanceOf(primaryAddress).call();
  const result = {
    balance: parseFloat(balance) / globalDecimals,
    transactionHash: mint.transactionHash,
  };
  return result;
};

/**
 * Supplies new tokens to the ATM.
 */
const completeSupply = (
  state: any,
  updateAppState: Function,
  setTransactionHash: Function,
  setProcessing: Function
) => async (values: any) => {
  const amount = parseFloat(values.amount);
  const primaryAddress = state.web3State.address;
  const { lendingPool, zDai } = state.teller.contracts.daiETH;
  try {
    const { balance, transactionHash } = await supplyDai(
      setProcessing,
      amount,
      primaryAddress,
      lendingPool,
      zDai,
      state.web3State
    );
    setProcessing('');
    setTransactionHash(transactionHash);
    updateAppState((st: AppContextState) => {
      const teller = st.teller;
  // TODO: this should update based on the selected ATM type.
      return { ...st, teller };
    });
  } catch (error) {
    console.log(error);
    updateAppState((st: AppContextState) => {
      const errorModal = {
        show: true,
        message:
          "An error occurred during the lending process. Please try again.",
        title: "Error",
      };
      return { ...st, errorModal };
    });
  }
};

export default completeSupply;
