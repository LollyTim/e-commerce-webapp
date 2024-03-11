import prism from "@/libs/prismadb";
export default async function getOrder() {
  try {
    const orders = await prisma?.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdDate: "desc",
      },
    });
    return orders;
  } catch (error: any) {
    throw new Error(error);
  }
}
