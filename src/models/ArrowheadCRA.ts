/**
 * ArrowheadCRA API interface.
 *
 * @namespace ArrowheadCRA
 * @category ReactModels
 * @desc Holds API information for the ArrowheadCRA functions
 */

import axios from 'axios';
import { craURLs, Address } from './../util/constants';

/**
 * @name LendingApplication
 * @desc This is an ArrowheadCRA lending application datatype. Necessary to complete
 *       lending.
 */
export interface LendingApplication {
  borrowedAsset: string;
  collateralAsset: string;
  requestedLoanSize: number;
  loanTermLength: number;
  collateralPercentEntered: number;
  loanUse: string;
  assetReportStringified?: string;
  assetReportSignature?: string;
  ethereumWallet?: string;
  nonce: string;
  nonceSignature: string;
};

/**
 * @name LoanRequest
 * @desc This is the data returned from ArrowheadCRA. It contains packaged lending information
 *       which will be sent to consensus nodes.
 * @todo Integrate this typing into the response of sendLendingApplication.
 * @see {@link sendLendingApplication}
 */
export interface LoanRequest {
  borrower: Address;
  recipient: Address;
  consensusAddress: Address;
  requestNonce: number;
  amount: number;
  duration: number;
  requestTime: number;
}

/**
 * @name sendLendingApplication
 * @desc Send bank information to the Arrowhead CRA endpoint.
 */
export const sendLendingApplication = (lendingApplication: LendingApplication) => axios({
  method: 'post',
  url: craURLs.arrowhead,
  data: {
    id: 1,
    jsonrpc: '2.0',
    method: 'arrowheadCRA',
    params: lendingApplication
  }
});
