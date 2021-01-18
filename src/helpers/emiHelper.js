const calculateEmi = (p, r, n) => (p*r*Math.pow(1+r,n))/(Math.pow(1+r,n-1));

export default calculateEmi;
