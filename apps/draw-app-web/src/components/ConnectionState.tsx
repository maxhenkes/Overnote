type ConnectionStateProps = {
  isConnected: boolean;
};

export const ConnectionState = ({ isConnected }: ConnectionStateProps) => {
  return <p>State: {"" + isConnected}</p>;
};
