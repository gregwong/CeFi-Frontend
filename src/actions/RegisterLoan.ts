/**
 * Call ArrowheadCRA with the given loan details.
 *
 * @namespace RegisterLoan
 * @category ReactActions
 */

import { sendLendingApplication, LendingApplication, LoanRequest } from './../models/ArrowheadCRA';
import { AppContextState } from "./../context/app";
import { createLoanWithTerms } from "../models/Contracts"
import {
  fetchLoanConsensus,
  LoanConsensusRequest,
  LoanConsensusResponse
} from "../models/LoanConsensus"


/**
 * Send a fully signed and setup loan registration.
 * @desc Takes the lending application data and goes through the lending flow.
 * @param lendingApplication - the full lending application.
 * @param web3 - The web3 module to grab the lending application contract interface.
 * @todo Fully connect.
 * @see {@link LoanConsensus, ArrowheadCRA}
 */
export default async function registerLoan(lendingApplication: LendingApplication, updateAppState: Function) {
  try {
    // Step 1: sent loan application to arrowheadCRA
    //    const loanRequest = await sendLengingApplication(... LendingApplication ...)
    // Step 2: Send multiple loan consensus requests to nodes using the returned loanRequest generated in
    //         step1.
    //    const loanConsensusResponses = await map( ... fetchLoanConsensus(...) )
    // Step 3: merge LoanApplication Data and Consensus reqsponses and create a loan request transaction.
    //    const result = createLoanWithTerms( loanRequest, loanConsensusResponses, ... )
    return;
  } catch (err) {
    return updateAppState((st: AppContextState) => {
      const errorModal = {
        show: true,
        message: "An error occurred sending lending application. Please try again.",
        title: "Error"
      };
      return { ...st, errorModal };
    });
  }
}
