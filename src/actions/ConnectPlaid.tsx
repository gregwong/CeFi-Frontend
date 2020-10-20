/**
 * Abstraction that will open the Plaid modal and after the login, will store the Plaid
 * public_token.
 *
 * @namespace ConnectPlaid
 * @category ReactActions
 */

import Plaid from "./../models/Plaid";
import { createPlaidLinkToken, submitPlaidPublicToken } from "../services/data-provider";
import { AppContextState, BankInfoResponseInterface } from "./../context/app";

export default (
  updateAppState: Function,
  address: string | null,
  setLoading: Function,
) => async () => {
  if (address === null) return;
  const plaidTokenResponse = await createPlaidLinkToken({ address });
  if (plaidTokenResponse.error) {
    switch (plaidTokenResponse.error.code) {
      case "BAD_REQUEST":
        break;
      case "INTERNAL_ERROR":
        break;
      case "UNAUTHORIZED":
        break;
      case "PROPERTY_FAILS":
        break;
    }
  } else {
    const { linkToken: token } = plaidTokenResponse.payload;
    const plaidHandler = new Plaid({
      token,
      onLoad: (): any => null,
      onSuccess: async function (publicToken: string, metadata: any) {
        const submitPlaidPublicTokenResponse = await submitPlaidPublicToken({
          address,
          publicToken,
        });
        if (submitPlaidPublicTokenResponse.error) {
          updateAppState((st: AppContextState) => {
            const errorModal = {
              show: true,
              message: "An error occurred fetching Plaid data. Please try again.",
              title: "Error",
            };
            return { ...st, errorModal };
          });
        } else {
          updateAppState((st: AppContextState) => {
            const plaid = st.plaid;
            const dataProviderResponse = st.dataProviderResponse;
            dataProviderResponse.providerTokens = submitPlaidPublicTokenResponse.payload;
            plaid.loggedIn = { publicKey: publicToken, metadata };
            return { ...st, plaid, dataProviderResponse };
          });
        }
      },
      onExit: async function () {
        setLoading(false);
      },
      onEvent: (): any => null,
    });
    plaidHandler.load();
  }
};
