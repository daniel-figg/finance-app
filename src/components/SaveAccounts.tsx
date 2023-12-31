"use server";
import { type AccountsGetRequest } from "plaid";
import { db } from "~/server/db";
import { plaidClient } from "~/server/api/plaidConfig";

const SaveAccounts = async (token: string) => {
  const { itemId } = await db.items.findFirstOrThrow({
    where: {
      accessToken: token,
    },
    select: {
      itemId: true,
    },
  });

  const request: AccountsGetRequest = {
    access_token: token,
  };
  try {
    const response = await plaidClient.accountsGet(request);
    const accounts = response.data.accounts;
    accounts.map(async (account) => {
      await db.accounts.create({
        data: {
          accountId: account.account_id,
          itemId: itemId,
          name: account.name,
        },
      });
    });
  } catch (error) {
    // handle error
  }
};
export default SaveAccounts;
