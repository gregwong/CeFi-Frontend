/**
 * Loan Consensus API interface.
 *
 * @namespace LoanConsensus
 * @category ReactModels
 * @desc Holds API information for the loan consensus nodes.
 */

import axios from 'axios';
import { craURLs, Address, Signature } from './../util/constants';
import { LoanRequest } from './ArrowheadCRA';


/**
 * @name LoanConsensusResponse
 * @desc Response type for a loan response from a consensus node.
 * @todo integrate into the fetchLoanConsensus function.
 * @see {@link fetchLoanConsensus}
 */
export interface LoanConsensusResponse {
  signer: Address;
  consensusAddress: Address;
  responseTime: number;
  interestRate: number;
  collateralRatio: number;
  maxLoanAmount: number;
  signature: Signature;
}

/**
 * @name LoanConsensusRequest
 * @desc Data required for a consensus request. Data from ArrowheadCRA will be sent
 *       to a consensus node to determine credit-worthyness.
 * @see {@link ArrowheadCRA LoanRequest fetchLoanConsensus}
 */
export interface LoanConsensusRequest {
  url: string;
  loanRequest: LoanRequest;
}

/**
 * @name fetchLoanConsensus
 * @desc Sends loanConsensusRequest to a consensus node. Should return a LoanConsensusResponse to
 *       eventually package into a loanRequest on-chain.
 * @see {@link ArrowheadCRA LoanRequest sendLendingApplication}
 * @todo Connect datatypes and the actual url request. Currently not working.
 */
export const fetchLoanConsensus = (loanConsensusRequest: LoanConsensusRequest) => {
  return axios({
    method: 'post',
    url: craURLs.consensus + '/request-loan',
    data: { loanConsensusRequest }
  })
}
