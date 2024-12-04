import { type EnrichedOfferDataType } from "@/sdk/queries";
import { NULL_ADDRESS } from "@/sdk/constants";
import { useEnrichedOffers } from "./use-enriched-offers";
import { RoycoMarketType, RoycoMarketUserType } from "../market";
import { useEnrichedMarkets } from "./use-enriched-markets";

export const useHighestOffers = ({
  chain_id,
  market_id,
  market_type,
}: {
  chain_id: number;
  market_id: string;
  market_type: number;
}) => {
  let data: {
    ap_offers: Array<EnrichedOfferDataType>;
    ip_offers: Array<EnrichedOfferDataType>;
  } = {
    ap_offers: [],
    ip_offers: [],
  };

  const propsEnrichedMarket = useEnrichedMarkets({
    chain_id,
    market_type,
    market_id,
  });

  const propsEnrichedOffersAP = useEnrichedOffers({
    chain_id,
    market_id,
    market_type,
    can_be_filled: true,
    filters: [
      {
        id: "offer_side",
        value: 0,
      },
    ],
    sorting: [
      {
        id: "annual_change_ratio",
        desc: false,
      },
    ],
  });

  const propsEnrichedOffersIP = useEnrichedOffers({
    chain_id,
    market_id,
    market_type,
    can_be_filled: true,
    filters: [
      {
        id: "offer_side",
        value: 1,
      },
    ],
    sorting: [
      {
        id: "annual_change_ratio",
        desc: true,
      },
    ],
  });

  const isLoading =
    propsEnrichedOffersAP.isLoading ||
    propsEnrichedOffersIP.isLoading ||
    propsEnrichedMarket.isLoading;
  const isRefetching =
    propsEnrichedOffersAP.isRefetching ||
    propsEnrichedOffersIP.isRefetching ||
    propsEnrichedMarket.isRefetching;
  const isError =
    propsEnrichedOffersAP.isError ||
    propsEnrichedOffersIP.isError ||
    propsEnrichedMarket.isError;

  if (
    !isLoading &&
    propsEnrichedMarket.data &&
    propsEnrichedMarket.data.length > 0
  ) {
    const enrichedMarket = propsEnrichedMarket.data[0];

    if (
      enrichedMarket &&
      enrichedMarket.market_type === RoycoMarketType.recipe.value
    ) {
      // Recipe Market
      data = {
        ap_offers:
          !!propsEnrichedOffersAP.data &&
          !!propsEnrichedOffersAP.data &&
          !!propsEnrichedOffersAP.data.count &&
          propsEnrichedOffersAP.data.count !== 0 &&
          !!propsEnrichedOffersAP.data.data
            ? // @ts-ignore
              (propsEnrichedOffersAP.data.data as Array<EnrichedOfferDataType>)
            : [],
        ip_offers:
          !!propsEnrichedOffersIP.data &&
          !!propsEnrichedOffersIP.data &&
          !!propsEnrichedOffersIP.data.count &&
          propsEnrichedOffersIP.data.count !== 0 &&
          !!propsEnrichedOffersIP.data.data
            ? // @ts-ignore
              (propsEnrichedOffersIP.data.data as Array<EnrichedOfferDataType>)
            : [],
      };
    } else if (
      enrichedMarket &&
      enrichedMarket.market_type === RoycoMarketType.vault.value
    ) {
      // Vault Market
      /**
       * This is the custom IP offer for the vault market, built for the UI
       */
      const ip_offer: EnrichedOfferDataType = {
        // @ts-ignore
        tokens_data: enrichedMarket.incentive_tokens_data,
        input_token_data: enrichedMarket.input_token_data,
        id: enrichedMarket.id ? enrichedMarket.id.concat("_id") : "no_id",
        chain_id: enrichedMarket.chain_id,
        market_type: enrichedMarket.market_type,
        offer_side: RoycoMarketUserType.ip.value,
        offer_id: enrichedMarket.id
          ? enrichedMarket.id.concat("_offer_id")
          : "no_offer_id",
        market_id: enrichedMarket.id,
        creator: enrichedMarket.owner,
        funding_vault: NULL_ADDRESS,
        input_token_id: enrichedMarket.input_token_id,
        quantity: enrichedMarket.locked_quantity,
        quantity_remaining: "0",
        expiry: "0",
        token_ids: enrichedMarket.base_incentive_ids,
        token_amounts: enrichedMarket.base_incentive_amounts,
        protocol_fee_amounts: [],
        frontend_fee_amounts: [],
        is_cancelled: false,
        transaction_hash: NULL_ADDRESS,
        block_timestamp: 0,
        can_be_filled: true,
        input_token_price: enrichedMarket.input_token_data.price,
        input_token_fdv: enrichedMarket.input_token_data.fdv,
        input_token_total_supply: enrichedMarket.input_token_data.total_supply,
        token_price_values: enrichedMarket.incentive_token_price_values,
        token_fdv_values: enrichedMarket.incentive_token_fdv_values,
        token_total_supply_values:
          enrichedMarket.incentive_token_total_supply_values,
        quantity_value_usd: enrichedMarket.locked_quantity_usd,
        incentive_value_usd: enrichedMarket.total_incentive_amounts_usd,
        name: enrichedMarket.name,
        lockup_time: enrichedMarket.lockup_time,
        reward_style: enrichedMarket.reward_style,
        annual_change_ratios: enrichedMarket.annual_change_ratios,
        annual_change_ratio: enrichedMarket.annual_change_ratio,
      };

      const ip_offers = [
        ip_offer,
        ...(!!propsEnrichedOffersIP.data &&
        !!propsEnrichedOffersIP.data.count &&
        propsEnrichedOffersIP.data.count !== 0 &&
        !!propsEnrichedOffersIP.data.data
          ? (propsEnrichedOffersIP.data.data as Array<EnrichedOfferDataType>)
          : []),
      ];

      data = {
        ap_offers:
          !!propsEnrichedOffersAP.data &&
          !!propsEnrichedOffersAP.data &&
          !!propsEnrichedOffersAP.data.count &&
          propsEnrichedOffersAP.data.count !== 0 &&
          !!propsEnrichedOffersAP.data.data
            ? (propsEnrichedOffersAP.data.data as Array<EnrichedOfferDataType>)
            : [],
        ip_offers: ip_offers,
      };
    }
  }

  return {
    isLoading,
    isRefetching,
    isError,
    data,
  };
};
