import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { refreshTokenInit } from "../store/actions";

export const RefreshSession = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshTokenInit());
  }, [dispatch]);

  return <>{children}</>;
};
