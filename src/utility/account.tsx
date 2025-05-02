export interface Account {
    username?: string;
    password?: string;
  }
  
  
  export const createAccount = async (account: Account): Promise<void> => {
    if (!account) {
      throw new Error("Account data is required");
    }
  
    // console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}`);
  
    const response = await fetch(`${process.env.NEXT_PUBLIC_GO_API_URL}/entrepreneur`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    });
  
    // console.log({
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(account),
    // });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to create account: ${errorData.message || response.statusText}`
      );
    }
  };
  