import prisma from "@/libs/prismadb";
export default async function getOrderByUserId(userId: string) {
  try {
    const orders = await prisma?.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdDate: "desc",
      },
      where: {
        userId: userId,
      },
    });
    return orders;
  } catch (error: any) {
    throw new Error(error);
    console.log("error at getorders>>>", error);
  }
}
