import { config } from "@keystone-next/keystone/schema";
import { statelessSessions } from "@keystone-next/keystone/session";
import { createAuth } from "@keystone-next/auth";
import { createSchema } from "@keystone-next/keystone/schema";
import { User } from "./schemas/User";
import { Post } from "./schemas/Post";
import { Tag } from "./schemas/Tag";
import { CartItem } from "./schemas/CartItem";
import { Order, OrderItem } from "./schemas/Order";
import { Product, ProductImage } from "./schemas/Product";
import { Role } from "./schemas/Role";
import endpoint from "./utils/endpoints";
import { sendPasswordResetEmail } from "./lib/mail";
import { extendGraphqlSchema } from "./mutations/index";
import { permissionsList } from "./schemas/fields";


let sessionSecret = endpoint.cookieSecret;

if (!sessionSecret) {
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "The SESSION_SECRET environment variable must be set in production"
    );
  }
}

let sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  sessionData: `id name email role { ${permissionsList.join(" ")} }`,
  initFirstItem: {
    fields: ["name", "email", "password"],
  },
  passwordResetLink: {
    async sendToken(args) {
      // Send the email
      await sendPasswordResetEmail(args.token, args.identity);
    },
  },
});

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret,
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [endpoint.frontendUrl],
        credentials: true,
      },
    },
    db: {
      adapter: "prisma_postgresql",
      url:
        endpoint.databaseUrl ||
        "postgres://angusbezzina@localhost/alexanderbezzina-keystone",
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    extendGraphqlSchema,
    lists: createSchema({
      User,
      Post,
      Tag,
      CartItem,
      Order,
      OrderItem,
      Product,
      ProductImage,
      Role,
    }),
    session,
  })
);
