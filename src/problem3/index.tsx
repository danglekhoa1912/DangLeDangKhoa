//Here's a refactored version addressing these issues:
interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
  }
  interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
    usdValue: number;
  }
  
  interface Props extends BoxProps {}
  
  const WalletPage: React.FC<Props> = ({ children, className, ...rest }) => {
    const balances = useWalletBalances();
    const prices = usePrices();
  
    const getPriority = (blockchain: string): number => {
      switch (blockchain) {
        case 'Osmosis': return 100;
        case 'Ethereum': return 50;
        case 'Arbitrum': return 30;
        case 'Zilliqa': return 20;
        case 'Neo': return 20;
        default: return -99;
      }
    }
  
    const formattedBalances = useMemo(() => {
      return balances
        .filter(balance => getPriority(balance.blockchain) > -99 && balance.amount > 0)
        .sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain))
        .map(balance => ({
          ...balance,
          formatted: balance.amount.toFixed(2),
          usdValue: prices[balance.currency] * balance.amount
        }));
    }, [balances, prices]);
  
    return (
      <div className={className} {...rest}>
        {formattedBalances.map((balance, index) => (
          <WalletRow 
            className={classes.row}
            key={balance.currency + index}
            amount={balance.amount}
            usdValue={balance.usdValue}
            formattedAmount={balance.formatted}
          />
        ))}
      </div>
    )
  }
  