import { getUserFromEmail } from "@lib/user";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { useEffect } from "react";

export const YourApp = () => {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();

  return (
    <>
      {openConnectModal && (
        <button onClick={openConnectModal} type="button">
          Open Connect Modal
        </button>
      )}

      {openAccountModal && (
        <button onClick={openAccountModal} type="button">
          Open Account Modal
        </button>
      )}

      {openChainModal && (
        <button onClick={openChainModal} type="button">
          Open Chain Modal
        </button>
      )}
    </>
  );
};

export default YourApp;
