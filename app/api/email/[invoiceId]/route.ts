import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  try {
    const session = await requireUser();

    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const sender = {
      email: "hello@demomailtrap.co",
      name: "Vraj jariwala",
    };

    emailClient.send({
      from: sender,
      to: [{ email: "vrajjariwala123@gmail.com" }],
      template_uuid: "9a7a01ff-cd6e-4321-b7a6-5b4395fad942",
      template_variables: {
        first_name: invoiceData.clientName,
        company_info_name: "Vraj jariwala",
        company_info_address: "Vasant Kunj",
        company_info_city: "Surat",
        company_info_zip_code: "395001",
        company_info_country: "India",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send Email reminder" },
      { status: 500 }
    );
  }
}