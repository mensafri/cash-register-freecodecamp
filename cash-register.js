function checkCashRegister(price, cash, cid) {
    let kembalian = cash * 100 - price * 100;
  
    let uangKasir = cid.map(el => el[1]).reduce((acc, curr) => acc + curr * 100, 0);
    
    const data = {
      PENNY: 1,
      NICKEL: 5,
      DIME: 10,
      QUARTER: 25,
      ONE: 100,
      FIVE: 500,
      TEN: 1000,
      TWENTY: 2000,
      "ONE HUNDRED": 10000
    }
    
  
    if(kembalian > uangKasir){
      return {status: "INSUFFICIENT_FUNDS", change: []};
    }
  
    else if(kembalian === uangKasir){
      return {status: "CLOSED", change: cid}
    }
    
    else{
      cid = cid.reverse();
      let jumlahKembalian = [];
      cid.forEach(el => {
        let awal = [el[0], 0];
        let satuan = el[0];
        let pecahan = el[1] * 100;
        while(kembalian >= data[satuan] && pecahan > 0){
          kembalian -= data[satuan];
          pecahan -= data[satuan];
          awal[1] += data[satuan] / 100;
        }
  
        if(awal[1] > 0){
          jumlahKembalian.push(awal)
        }
      });
  
      if(kembalian > 0){
        return {status: "INSUFFICIENT_FUNDS", change: []};
      }
  
      return {
        status: "OPEN", change: jumlahKembalian
        }; 
    }
  }
  
  console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));