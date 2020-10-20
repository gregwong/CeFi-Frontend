import { ApiGatewayBusinessResponseBody, makePost } from "@bgpc/aws-serverless-toolkit";
import {
  PublicTokenRequestBody,
  PublicTokenResponsePayload,
  PublicTokenPossibleErrorData,
} from "../../../data-provider/src/functions/public-token/types";
import { dataProviderUrl } from "../../util/constants";

export const submitPlaidPublicToken = makePost<
  PublicTokenRequestBody,
  ApiGatewayBusinessResponseBody<PublicTokenResponsePayload, PublicTokenPossibleErrorData>
>(`${dataProviderUrl}/public-token`);
