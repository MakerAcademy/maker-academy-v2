import { SocialButton } from "@components/forms/RegisterForm";
import { CommonContext } from "@context/commonContext";
import { useAppSelector } from "@hooks/useRedux";
import { handleWalletRegister } from "@lib/auth";
import { findWalletUser } from "@lib/user";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import { Box, Tooltip } from "@mui/material";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import Router from "next/router";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const Web3AuthButton = ({ tooltip = "", ...other }) => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { setCommonState } = useContext(CommonContext);
  const { user } = useAppSelector((state) => state.user);
  const { status, address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const { disconnect } = useDisconnect({
    onError(error) {
      console.log("Error", error);
    },
  });

  useEffect(() => {
    disconnect();
  }, []);

  const handleRegister = async () => {
    setLoading(true);
    if (status === "connected" && isConnected && !user) {
      const _found = await findWalletUser(address);

      const res = await handleWalletRegister(address)
        .then(() => {
          if (!_found) {
            setCommonState({
              loadingOverlay: [
                "Creating User...",
                "Generating Profile...",
                "Finalizing...",
                "Finalizing...",
                "Finalizing...",
              ],
            });

            setTimeout(() => {
              setCommonState({ loadingOverlay: null });
              Router.push("/");
            }, 15000);
          } else {
            setCommonState({
              loadingOverlay: ["Logging in..."],
            });

            setTimeout(() => {
              setCommonState({ loadingOverlay: null });
              Router.push("/");
            }, 1000);
          }
        })
        .catch((err) => {
          if (err?.message) {
            enqueueSnackbar(JSON.stringify(err || {}), {
              variant: "error",
              autoHideDuration: 4000,
              onClose: () => Router.push("/login"),
            });
          }
        });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (status === "connected" && isConnected && !user && !loading) {
        handleRegister();
      }
    }, 200);
  }, [status, isConnected, loading, user]);

  return (
    <>
      <Tooltip tooltip={tooltip}>
        <SocialButton
          color="#f2a900"
          tooltip="Web3"
          onClick={openConnectModal}
          disabled={!!loading}
        >
          <CurrencyBitcoinIcon />
        </SocialButton>
      </Tooltip>

      {/* <div style={{ display: "none" }}>
        <ConnectButton />
      </div> */}
    </>
  );
};

export default Web3AuthButton;
