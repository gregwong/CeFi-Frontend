import { ApiGatewayBusinessResponseBody, makePost } from "@bgpc/aws-serverless-toolkit";
import {
  LinkTokenResponsePayload,
  LinkTokenRequestBody,
  LinkTokenPossibleErrorData,
} from "../../../data-provider/src/functions/link-token/types";
import { dataProviderUrl } from "../../util/constants";

export const createPlaidLinkToken = makePost<
  LinkTokenRequestBody,
  ApiGatewayBusinessResponseBody<LinkTokenResponsePayload, LinkTokenPossibleErrorData>
>(`${dataProviderUrl}/link-token`);
