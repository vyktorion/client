
import { getServerSession } from "next-auth/next";

async function TestPage() {
  const session = await getServerSession();
  console.log({ session })

  // const resProduct = await fetch("http://localhost:8000/test", {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
  // const dataProduct = await resProduct.json();


  // const resOrder = await fetch("http://localhost:8001/test", {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
  // const dataOrder = await resOrder.json();


  // const resPayment = await fetch("http://localhost:8002/test", {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
  // const dataPayment = await resPayment.json();

  return <div className="">TestPage NextAuth</div>;
};

export default TestPage;
