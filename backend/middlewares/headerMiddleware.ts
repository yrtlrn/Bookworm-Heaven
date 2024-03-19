import { Request, Response, NextFunction } from "express";

type ResBody = {
  last_update_utc: string;
  headers: [{ name: string; value: string }];
};

const getHeadersOWASP = async () => {
  const response = await fetch(
    "https://owasp.org/www-project-secure-headers/ci/headers_add.json",
    {
      method: "GET",
    }
  );

  const resBody = await response.json();

  if (resBody) {
    const resBodyModified = resBody as ResBody;
    return resBodyModified.headers;
  }
};

export const customHeadersConfig = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const getHeaders = await getHeadersOWASP();

  const newHeader: { [k: string]: any } = {};

  if (getHeaders) {
    getHeaders.map(
      (header: { name: string; value: string }) => {
        if (header.name === "Clear-Site-Data") {
          return;
        } else {
          newHeader[`${header.name}`] = header.value;
        }
      }
    );
  }

  res.set(newHeader ? newHeader : "");

  next();
};

