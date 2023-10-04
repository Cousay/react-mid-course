import React, { useState } from "react";

const useMutation = (promise) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const execute = async (payload, { onSuccess, onFail }) => {
    setLoading(true);
    try {
      const res = await promise(payload);

      if (res.data) {
        setData(res.data);
        onSuccess?.(res.data);
      }
    } catch (error) {
      setError(error);
      onFail?.(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    execute,
    data,
    loading,
    error,
  };
};

export default useMutation;
