import React, { createContext, useState } from "react";
import { LendingApplication } from "../models/ArrowheadCRA";
import {
  Web3State,
  BankInfoResponseInterface,
  AvailableLendingTokens,
  BaseTokens,
} from "../context/app";
import {
  ContextProps,
  BorrowRequest,
  BorrowPageContextInterface
} from "./types";

const DAYS = 86400; // Seconds per day

export const LendingApplicationMap = (
  borrowRequest: BorrowRequest,
  bankInfoResponse: BankInfoResponseInterface | null,
  tokenDecimals: number,
  web3State: Web3State
): LendingApplication => {
  const lendingApplication = {
    borrowedAsset: borrowRequest.lendWith,
    collateralAsset: borrowRequest.collateralWith,
    requestedLoanSize: borrowRequest.loanSize,
    loanTermLength: borrowRequest.loanTerm * DAYS,
    collateralRatioEntered: borrowRequest.collateralPercent / 100,
    loanUse: borrowRequest.loanType.toUpperCase(),
    ethereumWallet: web3State.address,
    assetReportStringified:
      bankInfoResponse &&
      JSON.stringify(bankInfoResponse.assetReportStringified),
    assetReportSignature:
      bankInfoResponse && bankInfoResponse.assetReportSignature,
    blockNumber: web3State.blockNumber,
    requestTime: Date.now()
  };
  return lendingApplication as LendingApplication;
};

const defaultBorrowRequest = {
  loanSize: 100,
  loanTerm: 1,
  collateralWith: BaseTokens.ETH,
  collateralPercent: 150,
  loanType: "Secured",
  bankConnected: false,
  lendWith: AvailableLendingTokens.DAI,
  collateralAmount: 1,
  approved: false,
  transferred: false,
  requestTime: Math.floor(Date.now()/1000)
};
const mockLoanTerms = {
  interestRate: 20,
  minCollateralNeeded: 100,
};

const LoanTerms = {
  collateralRatio: null as null,
  consensusAddress: null as null,
  responseTime: null as null,
  interestRate: null as null,
  minCollateralNeeded: null as null,
  maxLoanAmount: null as null,
  nonce: null as null,
  signature: null as null,
};

export const BorrowPageContext = createContext<BorrowPageContextInterface>({
  stage: 0,
  setStage: () => {},
  submenu: null as null,
  setSubmenu: () => {},
  borrowRequest: defaultBorrowRequest,
  setBorrowRequest: () => {},
  loanTerms: LoanTerms,
  setLoanTerms: () => {},
  borrowProcessState: null,
});

const BorrowPageContextProvider = ({ children }: ContextProps) => {
  const [stage, setStage] = useState(0);
  const [submenu, setSubmenu] = useState(null as null);
  const [borrowRequest, setBorrowRequest] = useState(defaultBorrowRequest);
  const [loanTerms, setLoanTerms] = useState(LoanTerms);

  const [success, setSuccess] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isRequesting, setRequesting] = useState(false);
  const [stageChangeWarning, setStageChangeWarning] = useState(null);

  const borrowProcessState = {
    success,
    setSuccess,
    isSubmitting,
    setSubmitting,
    isRequesting,
    setRequesting,
    stageChangeWarning,
    setStageChangeWarning,
  };

  return (
    <BorrowPageContext.Provider
      value={{
        stage,
        setStage,
        submenu,
        setSubmenu,
        borrowRequest,
        setBorrowRequest,
        loanTerms,
        setLoanTerms,
        borrowProcessState,
      }}
    >
      {children}
    </BorrowPageContext.Provider>
  );
};
export default BorrowPageContextProvider;
