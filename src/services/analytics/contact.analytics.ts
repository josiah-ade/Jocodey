import { API_AUTH } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";
import { GetContactStatsResDto } from "./dto/contact.analytics.dto";
import dayjs from "dayjs";

export class ContactStatsOptionsDto {
  year?: number;
}

export async function getContactStats(
  options?: ContactStatsOptionsDto
): Promise<GetContactStatsResDto | null> {
  try {
    await API_AUTH();

    const year = options?.year ?? dayjs().year();
    const todayStart = dayjs().startOf("day").toDate();
    const todayEnd = dayjs().endOf("day").toDate();
    const yearStart = dayjs(`${year}-01-01`).startOf("year").toDate();
    const yearEnd = dayjs(`${year}-12-31`).endOf("year").toDate();

    // 🔹 All-time total number of contact messages
    const allTimeContacts = await prisma.contactMessage.count();

    // 🔹 Today's total number of contact messages
    const todayContacts = await prisma.contactMessage.count({
      where: {
        createdAt: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    });

    // 🔹 Group contacts by month (within selected year)
    const monthlyContacts = await prisma.contactMessage.groupBy({
      by: ["createdAt"],
      _count: { _all: true },
      where: {
        createdAt: {
          gte: yearStart,
          lte: yearEnd,
        },
      },
    });

    // Normalize data to Jan–Dec chart format
    const chartData = Array.from({ length: 12 }, (_, i) => {
      const count = monthlyContacts.filter(
        (m) => dayjs(m.createdAt).month() === i
      ).length;
      return {
        month: dayjs().month(i).format("MMM"),
        total: count,
      };
    });

    // 🔹 Group by status (all-time)
    const allTimeStatus = await prisma.contactMessage.groupBy({
      by: ["status"],
      _count: { _all: true },
    });

    // 🔹 Group by status (today)
    const todayStatus = await prisma.contactMessage.groupBy({
      by: ["status"],
      _count: { _all: true },
      where: {
        createdAt: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    });

    // 🔹 Format final result
    const result = {
      year,
      allTimeContacts,
      todayContacts,
      chartData,
      allTimeStatus: allTimeStatus.map((r) => ({
        status: r.status,
        total: r._count._all,
      })),
      todayStatus: todayStatus.map((r) => ({
        status: r.status,
        total: r._count._all,
      })),
    };

    return result as GetContactStatsResDto;
  } catch (err) {
    console.error("[getContactStats Error]", err);
    return null;
  }
}
