import prisma from "@/libs/prismadb";

export interface IProductParams {
  category?: string | null;
  searchTerm?: string | null;
}

export default async function getProducts(params: IProductParams) {
  try {
    const { category, searchTerm } = params;
    let searchString = searchTerm;

    if (!searchTerm) {
      searchString = "";
    }

    let query: any = {};
    if (category) {
      query.category = category;
    }

    const products = await prisma.product.findMany({
      where: {
        ...query,
        OR: [
          {
            name: {
              contains: searchString,
              mode: "insensitive",
            },
            description: {
              contains: searchString,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdDate: "desc",
          },
        },
      },
    });
    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getStaticProps(context: any) {
  const searchParams = context.query;
  const products = await getProducts(searchParams); // Fetch with dynamic data

  return {
    props: {
      searchParams,
      products,
    },
    revalidate: 60, // Revalidate data every 60 seconds (optional)
  };
}
