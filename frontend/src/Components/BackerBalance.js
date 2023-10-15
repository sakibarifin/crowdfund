import { useAccount, useBalance } from 'wagmi'

const BackerBalance = ()=>{
    const {address} = useAccount();
    
    const {data} = useBalance({address})
console.log(data);
    return <>{data?.formatted ?? "-"}</>
}

export default BackerBalance;