import prisma from "../prisma";

export const OTToken = {
  get: async (oTTokenId: string) => {
    const currentDate = new Date();

    const otToken = await prisma.oTToken.findFirst({
      where: {
        id: oTTokenId,
        validUntil: {
          gte: currentDate,
        },
      },
    });

    return otToken?.id;
  },

  burn: async (oTTokenId: string) => {
    const deletedToken = await prisma.oTToken.delete({
      where: {
        id: oTTokenId,
      },
    });

    return deletedToken;
  },

  create: async (userId: string, minutes: number) => {
    const currentDate = new Date();
    const validUntil = new Date(currentDate.getTime() + minutes * 60 * 1000); // 24 hours
    return await prisma.oTToken.create({
      data: {
        validUntil,
        userId: userId,
      },
    });
  },
};

export default OTToken;
