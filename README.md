# WIP (Work in Progress)

## Getting Started

Royco SDK is divided into 3 modular components which can be hooked together to create a fully functional frontend application on top of Royco Protocol.

### 1. Provider

Under the hood, it's a wrapper around our Supabase client for fetching data and React Query for caching it on client-side. In order to use Royco SDK, you need to wrap your application with RoycoProvider and provide two values -- `roycoUrl` and `roycoKey` which are the URL and API key of your Royco Protocol instance respectively. It also takes an optional `defaultOptions` prop which can be used to configure the default options for React Query Provider.

```tsx
import { RoycoProvider } from "royco";

const App = () => {
  return (
    <RoycoProvider roycoUrl="YOUR_ACCESS_URL" roycoKey="YOUR_ACCESS_API_KEY">
      <YourApp />
    </RoycoProvider>
  );
};
```

### 2. Hooks

These are used to fetch relevant data and interact with Royco Protocol. They take care of caching and invalidating data on client-side using React Query. Hooks are available for most of the common operations like fetching pools, fetching tokens, fetching user data, etc.

```tsx
import { useRoycoHook } from "royco/hooks";

const YourComponent = () => {
  const { data, isLoading, isError } = useRoycoHook();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  return <div>{JSON.stringify(data)}</div>;
};
```

### 3. Queries

These are your entry point into our managed data endpoints. They are used to fetch data from Royco Protocol and are used internally by hooks. You can also use them directly to fetch data without caching. Queries return the type options provided to useQuery from React Query.

You can use these queryOptions in 2 ways:

a. Pass them directly to useQuery and build your own custom hooks

```tsx
import { useQuery } from "react-query";
import { getRoycoQueryOptions1, getRoycoQueryOptions2 } from "royco/queries";

const useCustomRoycoHook = () => {
  const {
    data: data1,
    isLoading: isLoadingData1,
    isError: isErrorData1,
  } = useQuery(getRoycoQueryOptions1);

  const {
    data: data2,
    isLoading: isLoadingData2,
    isError: isErrorData2,
  } = useQuery(getRoycoQueryOptions2);

  const isLoading = isLoadingData1 || isLoadingData2;
  const isError = isErrorData1 || isErrorData2;

  let data = null;

  if (!isLoading && !isError && !!data1 && !!data2) {
    data = {
      ...data1,
      ...data2,
    };
  }

  return { data, isLoading, isError };
};
```

b. Destrucutre the correponding object and only use a subset of them by overriding the default options

```tsx
import { useQuery } from "react-query";
import { getRoycoQueryOptions } from "royco/queries";

const YourComponent = () => {
  const { data, isLoading, isError } = useQuery({
    ...getRoycoQueryOptions,
    yourCustomOptions: "yourCustomOptions",
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  return <div>{JSON.stringify(data)}</div>;
};
```

## Additional Features

### 1. Custom Hooks

You can create custom hooks by combining multiple queries and hooks together. This can be useful when you want to fetch multiple data points and show them in a single component without repeating the same logic and worrying about caching -- because we have already taken care of keys and data invalidation at regular intervals, so you can keep building your custom components and all the relevant data will be automatically fetched and updated in the most efficient way.

```tsx
import { useQuery } from "react-query";
import { getReactQueryOptions } from "royco/queries";
import { useRoycoHook } from "royco/hooks";

const useCustomRoycoHook = () => {
  const {
    data: data1,
    isLoading: isLoadingData1,
    isError: isErrorData1,
  } = useQuery(getReactQueryOptions);
  const {
    data: data2,
    isLoading: isLoadingData2,
    isError: isErrorData2,
  } = useRoycoHook();

  const isLoading = isLoadingData1 || isLoadingData2;
  const isError = isErrorData1 || isErrorData2;

  let data = null;

  if (!isLoading && !isError && !!data1 && !!data2) {
    data = {
      ...data1,
      ...data2,
    };
  }

  return { data, isLoading, isError };
};
```

### 2. Custom Queries

You can write on your own queries on top of our existing tables and views to match your requirements. In order to do that, you can refer the type `Database` which is a generic type that lists out all the tables & views available along with their corresponding columns. You will need to write a custom query and pass that to royco client from `useRoycoClient` to fetch the data.

```tsx
import { useRoycoClient } from "royco/client";

const YourComponent = () => {
  const client = useRoycoClient();

  const { data, isLoading, isError } = client
    .from("table_name")
    .select("column1, column2, etc.")
    .throwOnError()
    .then((result) => result.data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  return <div>{JSON.stringify(data)}</div>;
};
```
