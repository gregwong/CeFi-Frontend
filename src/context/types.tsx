import { AvailableLendingTokens, BaseTokens } from "./app";

export interface LoanInterface {
  id: string;
  token: string;
  collateralToken: string;
  transactionHash: string;
  terms: TermsInterface;
  startDate: number;
  endDate: number;
  amountBorrowed: number;
  status: StatusTypes;
  repayments: null | Array<LoanRepaymentInterface>;
  totalRepaidAmount: number;
  totalOwedAmount: number;
  collateralDeposits: null | Array<CollateralDepositInterface>;
  totalCollateralDepositsAmount: number;
  collateralWithdrawns: null | Array<CollateralWithdrawInterface>;
  totalCollateralWithdrawalsAmount: number;
  statusName?: string;
  timeTillExpires?: number;
  currentCollateralPercent?: number;
  collateralAmount?: number;
}

export interface CollateralWithdrawInterface {
  amount: number;
}
export interface CollateralDepositInterface {
  amount: number;
}

export interface TermsInterface {
  interestRate: number;
  collateralRatio: number;
  maxLoanAmount: number;
  duration: number;
  expiryAt: number;
}

export interface LoanRepaymentInterface {
  amount: number;
}

export interface DashboardContextInterface {
  onPage: PageTypes;
  setOnPage: Function;
  navigationMap: NavigationInterface;
  loans: null | Array<LoanInterface>;
  setLoans: Function;
}

export interface NavigationInterface {
  [key: string]: SubNavInterface;
}
export interface SubNavInterface {
  [key: string]: string;
}
export interface LendPageContextInterface {
  selectedCurrency: AvailableLendingTokens;
  setSelectedCurrency: Function;
  selectedAmount: number;
  setSelectedAmount: Function;
  tokensApproved: boolean;
  setTokensApproved: Function;
}

export interface BorrowRequest {
  loanSize: number;
  loanTerm: number;
  collateralWith: BaseTokens;
  collateralPercent: number;
  loanType: string;
  bankConnected: boolean;
  lendWith: AvailableLendingTokens;
  collateralAmount: null | number;
  approved: boolean;
  transferred: boolean;
}

export interface LoanTerms {
  interestRate: number;
  minCollateralNeeded: number;
}

export interface BorrowProcessInterface {
  success: boolean;
  setSuccess: Function;
  isSubmitting: boolean;
  setSubmitting: Function;
  isRequesting: boolean;
  setRequesting: Function;
  stageChangeWarning: boolean;
  setStageChangeWarning: Function;
}

export interface BorrowPageContextInterface {
  stage: number;
  setStage: Function;
  submenu: React.ReactNode;
  setSubmenu: Function;
  borrowRequest: BorrowRequest;
  setBorrowRequest: Function;
  loanTerms: LoanTerms;
  setLoanTerms: Function;
  borrowProcessState: null | BorrowProcessInterface;
}
export interface LendClaimStateInterface {
  success: null | boolean;
  setSuccess: Function;
  isCollecting: null | boolean;
  setCollecting: Function;
  assetChangeWarning: null | string;
  setAssetChangeWarning: Function;
  isClaiming: null | string;
  setClaiming: Function;
  assetClaimed: null | string;
  setAssetClaimed: Function;
}

export interface LendWithdrawStateInterface {
  selectedCurrency: AvailableLendingTokens;
  setSelectedCurrency: Function;
  isWithdrawing: boolean;
  setWithdrawing: Function;
  success: boolean;
  setSuccess: Function;
  warningMessage: string;
  setWarningMessage: Function;
}
export interface BorrowRepayStateInterface {
  isRepaying: boolean;
  setRepaying: Function;
  selectedLoan: null | LoanInterface;
  setSelectedLoan: Function;
  repaySuccess: boolean;
  setRepaySuccess: Function;
}
export interface BorrowDepositStateInterface {
  success: null | boolean;
  setSuccess: Function;
  isDepositing: null | boolean;
  setDepositing: Function;
  selectedLoan: null | LoanInterface;
  setSelectedLoan: Function;
  addCollateralSubmenu: null | boolean;
  setAddCollateralSubmenu: Function;
  collateral: null | number;
  setCollateral: Function;
}
export interface BorrowWithdrawStateInterface {
  success: boolean;
  setSuccess: Function;
  isWithdrawing: boolean;
  setWithdrawing: Function;
  selectedLoan: null | LoanInterface;
  setSelectedLoan: Function;
  withdrawCollateralSubmenu: boolean;
  setWithdrawCollateralSubmenu: Function;
  withdrawAmount: number;
  setWithdrawAmount: Function;
}
export interface UseCompoundStateInterface {
  success: boolean;
  setSuccess: Function;
  isWithdrawing: boolean;
  setWithdrawing: Function;
  isSupplying: boolean;
  setSupplying: Function;
  selectedLoan: null | LoanInterface;
  setSelectedLoan: Function;
  amountSubmenu: boolean;
  setAmountSubmenu: Function;
  amount: number;
  setAmount: Function;
  successMessage: string;
  setSuccessMessage: Function;
}
export interface UseUniswapStateInterface {}

export enum PageTypes {
  "Lend-Redeem" = "Lend-Redeem",
  "Lend-Withdraw" = "Lend-Withdraw",
  "Borrow-Repay" = "Borrow-Repay",
  "Borrow-Deposit" = "Borrow-Deposit",
  "Borrow-Withdraw" = "Borrow-Withdraw",
  "Spend-Compound" = "Spend-Compound",
  "Spend-Uniswap" = "Spend-Uniswap",
}

export enum StatusTypes {
  "TermsSet" = "TermsSet",
  "Active" = "Active",
  "Closed" = "Closed",
}

export type ContextProps = {
  children: React.ReactNode;
};