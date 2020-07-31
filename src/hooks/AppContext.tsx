/**
 * Provides an app context hook for general application data.
 *
 * This context is a custom hook that exposes useState and it's effectful updater.
 * @namespace AppContextHook
 * @category ReactHooks
 */

import * as React from "react";
import { AppContextDefault, AppContextState, Web3State } from './../context/app';
import Either from './../util/Either';

import Plaid, { PlaidTransaction } from './../models/Plaid';

import signInContracts from './../actions/signInContracts';

const mergeSignInContracts = async (state: AppContextState, updateAppState: Function) => {
  try {
    const zeroCollateral = await signInContracts(state.web3State, state.zeroCollateral);
    updateAppState((st: AppContextState) => ({
      ...st,
      zeroCollateral
    }));
  } catch (e) {
    updateAppState((st: AppContextState) => {
      const errorModal = {
        show: true,
        message: "An error occurred connecting your account. Please try again.",
        title: "Error"
      };
      return { ...st, errorModal };
    });
  }
};

const persistWeb3 = async (address: string, updateAppState: Function) => {
  updateAppState((st: AppContextState) => {
    st.web3State.address = address;
    return {
      ...st,
      loaded: true,
    };
  });
};

/**
 * Implements the app context hook.
 * @function useAppContext
 * @memberof AppContextHook
 */
export default function useAppContext()  {
  const [state, updateAppState] = React.useState(AppContextDefault.state);

  React.useEffect(() => {
    if (!state.web3State.web3) return;
    mergeSignInContracts(state, updateAppState);
  }, [state.web3State?.web3]);

  React.useEffect(() => {
    if (!state.loaded) {
      const address = localStorage.getItem('web3State.address');
      if (address) persistWeb3(address, updateAppState);
    };
    localStorage.setItem('web3State.address', state.web3State?.address);
  }, [state.web3State]);

  return [state, updateAppState];
}
