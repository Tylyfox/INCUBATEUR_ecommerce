<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CategoryRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=CategoryRepository::class)
 * @ApiResource(
 *      attributes={
 *          "pagination_enabled"=true,
 *          "pagination_items_per_page"=20,
 *          "order": {"name":"asc"}
 *      },
 *      subresourceOperations={
 *          "products_get_subresource"={"path"="/categories/{id}/produits"}
 *      },
 *      normalizationContext={
 *          "groups"= {"categories_read"}
 *      },
 *      collectionOperations={
 *          "GET"={"path"="/categories"},
 *          "POST"= {"path"="/categories"}
 *      },
 *      itemOperations={
 *          "GET"={"path"="/categories/{id}"},
 *          "DELETE"={"path"="/categories/{id}"},
 *          "PUT"={"path"="/categories/{id}"},
 *          "PATCH"={"path"="/categories/{id}"}
 *      }
 * )
 */
class Category
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"categories_read", "products_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"categories_read", "products_read"})
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity=Product::class, mappedBy="category")
     * @Groups({"categories_read"})
     * @ApiSubresource
     */
    private $products;

    public function __construct()
    {
        $this->products = new ArrayCollection();
    }
    
    /**
     * Allows to retrieve the total of the products
     * @Groups({"categories_read"})
     * @return float
     */
    public function getTotalPrice(): float
    {
        return array_reduce($this->products->toArray(), function($total, $products){
            return $total + $products->getPrice();
        },0);
    }
    
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, Product>
     */
    public function getProducts(): Collection
    {
        return $this->products;
    }
    
    public function addProduct(Product $product): self
    {
        if (!$this->products->contains($product)) {
            $this->products[] = $product;
            $product->setCategory($this);
        }

        return $this;
    }

    public function removeProduct(Product $product): self
    {
        if ($this->products->removeElement($product)) {
            // set the owning side to null (unless already changed)
            if ($product->getCategory() === $this) {
                $product->setCategory(null);
            }
        }

        return $this;
    }
}