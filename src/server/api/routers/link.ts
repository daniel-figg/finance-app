import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type LinkTokenCreateRequest, Products, CountryCode } from "plaid";
import { plaidClient } from "../plaidConfig";

export const linkRouter = createTRPCRouter({
  createLinkToken: publicProcedure.query(async () => {
    const request: LinkTokenCreateRequest = {
      user: {
        client_user_id: "user-id",
      },
      client_name: "Personal Finance App",
      products: [Products.Transactions, Products.Investments, Products.Auth],
      country_codes: [CountryCode.Us],
      language: "en",
    };
    try {
      const response = await plaidClient.linkTokenCreate(request);
      const linkToken = response.data.link_token;
      return linkToken;
    } catch (error) {
      // handle error
      console.log(error);
    }
  }),

  /* Exchange Public Token Old */

  // exchangePublicToken: publicProcedure
  //   .input(z.string())
  //   .mutation(async ({ ctx, input }) => {
  //     const request: ItemPublicTokenExchangeRequest = {
  //       public_token: input,
  //     };

  //     try {
  //       const response = await plaidClient.itemPublicTokenExchange(request);
  //       const generatedToken = response.data.access_token;
  //       const generatedId = response.data.item_id;
  //       await ctx.db.user.create({
  //         data: {
  //           accessToken: generatedToken,
  //           itemId: generatedId,
  //         },
  //       });
  //     } catch (err) {
  //       // handle error
  //     }
  //   }),
});
