import React, { useEffect } from 'react'

const MyCode = () => {

    useEffect()

    const rec=(c)=>{
        if(c<48)
        return;
        rec(c-1);
        console.log("value is : ",c);
    }
  return (
    <div>

        
    </div>
  )
}

export default MyCode


// int main()
// {
// int n1 = 57;
// rec(n1);
// }v
// oid rec(char c)
// {
// if(c<48)
// return ;
// rec(c-1);
// printf(" %c ",c);
// }