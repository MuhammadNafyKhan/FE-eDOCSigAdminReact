import Modal from "./Modal";
import React from "react";
interface IProps {
  onRefresh(): void;
  onLogoff(): void;
}
const NoActivity: React.FC<IProps> = ({ onRefresh, onLogoff }) => {
  return (
    <Modal classes="p-0 bg-white w-50" onClose={() => {}}>
      <div>
        <table width="100%" style={{ height: "100%" }}>
          <tbody>
            <tr>
              <td align="center">
                <table width="90%" style={{ height: "100%" }}>
                  <tr>
                    <td colSpan={2}>&nbsp;</td>
                  </tr>
                  <tr>
                    <th colSpan={2}>Session Timeout</th>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <hr />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} align="center">
                      <p>
                        You are being timed out due to inactivity. Please choose
                        to stay signed in or to logoff. Otherwise, you will be
                        logged off automatically.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <hr />
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <button
                        type="button"
                        className="ediBtn navCancel"
                        onClick={onLogoff}
                      >
                        Log Off
                      </button>
                    </td>
                    <td align="center">
                      <button
                        type="button"
                        className="ediBtn navNext"
                        onClick={onRefresh}
                      >
                        Refresh
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Modal>
  );
};
export default NoActivity;
