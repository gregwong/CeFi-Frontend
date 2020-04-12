/**
 * @namespace PlaidModel
 * @category ReactModels
 */

import Constants from './../../util/constants';
import axios from 'axios';

declare const window: any;
const serverURL = Constants.serverURL;
const Plaid = window.Plaid;

interface PlaidModelInterface {
  onLoad: Function;
  onSuccess: Function;
  onExit: Function;
  onEvent: Function;
}

export interface PlaidTransaction {
  name: string;
  date: string;
  amount: Number;
}

/**
 * Wrapper class for the Plaid API.
 * @class
 * @name PlaidModelClass
 * @memberof PlaidModel
 */
export default class PlaidModel {
  handler: any;
  plaidOptions: PlaidModelInterface;
  constructor(options: PlaidModelInterface) {
    this.plaidOptions = options;
  }

  load (): Promise<string> {
    try {
      this.handler = Plaid.create({
        clientName: 'Plaid Quickstart',
        countryCodes: ['US'],
        product: ['transactions'],
        env: 'sandbox',
        key: '8f8e5a63107fc2027a5768a1571988',
        onLoad: this.plaidOptions.onLoad,
        onSuccess: this.plaidOptions.onSuccess,
        onExit: this.plaidOptions.onExit,
        onEvent: this.plaidOptions.onEvent
      });
      this.handler.open();
      return Promise.resolve("Ok");
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Get handler getTransactions.
   * @static
   * @memberof PlaidModel
   */
  static async getTransactions(wallet: string): Promise<Array<any>> {
    const response = await axios.post(serverURL, {
      "jsonrpc": "2.0",
      "method": "getPlaidTransactions",
      "id": 1,
      "params": {
        "wallet": wallet
      }
    });

    return response.result?.transactions || Promise.reject("Failed to get transactions property from response.");
  }

  /**
   * Store plaid login access token.
   * @static
   * @memberof PlaidModel
   */
  static storeTokens(wallet: string, publicToken: string,): Promise<any> {
    return axios.post(serverURL, {
      "jsonrpc": "2.0",
      "method": "savePlaidAccessToken",
      "id": 1,
      "params": {
        "wallet": wallet,
        "publicToken": publicToken
      }
    });
  }

  /**
   * Get handler for user income using plaid's projected yearly income.
   * @static
   * @memberof PlaidModel
   */
  static async getIncome(public_token: string): Promise<any> {
    const response = await axios.post(serverURL, {
      "jsonrpc": "2.0",
      "method": "getPlaidIncome",
      "id": 1,
      "params":{
        "publicToken": public_token
      }
    });
    const data = response.data?.income?.amount;
    return data || Promise.reject("Failed to get income property from response.");
  }
}
