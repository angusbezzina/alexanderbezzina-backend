-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "passwordResetToken" TEXT,
    "passwordResetIssuedAt" TIMESTAMP(3),
    "passwordResetRedeemedAt" TIMESTAMP(3),
    "role" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "status" TEXT,
    "content" JSONB,
    "publishDate" TIMESTAMP(3),
    "author" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER,
    "product" INTEGER,
    "user" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "total" INTEGER,
    "charge" TEXT,
    "user" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "price" INTEGER,
    "quantity" INTEGER,
    "photo" INTEGER,
    "order" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "tagline" TEXT,
    "description" TEXT,
    "status" TEXT,
    "price" INTEGER,
    "photo" INTEGER,
    "user" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductImage" (
    "id" SERIAL NOT NULL,
    "image" JSONB,
    "altText" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "canManageProducts" BOOLEAN,
    "canSeeOtherUsers" BOOLEAN,
    "canManageUsers" BOOLEAN,
    "canManageRoles" BOOLEAN,
    "canManageCart" BOOLEAN,
    "canManageOrders" BOOLEAN,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Post_tags_Tag_posts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE INDEX "User.role_index" ON "User"("role");

-- CreateIndex
CREATE INDEX "Post.author_index" ON "Post"("author");

-- CreateIndex
CREATE INDEX "CartItem.product_index" ON "CartItem"("product");

-- CreateIndex
CREATE INDEX "CartItem.user_index" ON "CartItem"("user");

-- CreateIndex
CREATE INDEX "Order.user_index" ON "Order"("user");

-- CreateIndex
CREATE INDEX "OrderItem.photo_index" ON "OrderItem"("photo");

-- CreateIndex
CREATE INDEX "OrderItem.order_index" ON "OrderItem"("order");

-- CreateIndex
CREATE INDEX "Product.photo_index" ON "Product"("photo");

-- CreateIndex
CREATE INDEX "Product.user_index" ON "Product"("user");

-- CreateIndex
CREATE UNIQUE INDEX "Product_photo_unique" ON "Product"("photo");

-- CreateIndex
CREATE UNIQUE INDEX "_Post_tags_Tag_posts_AB_unique" ON "_Post_tags_Tag_posts"("A", "B");

-- CreateIndex
CREATE INDEX "_Post_tags_Tag_posts_B_index" ON "_Post_tags_Tag_posts"("B");

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("role") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("author") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD FOREIGN KEY ("product") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD FOREIGN KEY ("photo") REFERENCES "ProductImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD FOREIGN KEY ("order") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("photo") REFERENCES "ProductImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_tags_Tag_posts" ADD FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_tags_Tag_posts" ADD FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
