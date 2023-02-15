<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\ProductRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;


/**
 * @ORM\Entity(repositoryClass=ProductRepository::class)
 * @ApiResource(
 *      subresourceOperations={
 *          "api_categories_products_get_subresource"={
 *              "normalization_context"={"groups"={"products_subresource"}} 
 *          }
 *      },
 *      attributes={
 *          "pagination_enabled"=true,
 *          "pagination_items_per_page"=20,
 *          "order": {"name":"asc"}
 *      },
 *      normalizationContext={
 *          "groups"={"products_read"}
 *      },
 *      collectionOperations={
 *          "GET"={"path"="/produits"},
 *          "POST"={"path"="/produits"}
 *      },
 *      itemOperations={
 *          "GET"={"path"="/produits/{id}"},
 *          "DELETE"={"path"="/produits/{id}"},
 *          "PUT"={"path"="/produits/{id}"},
 *          "PATCH"={"path"="/produits/{id}"}
 *      }
 * )
 * @ApiFilter(SearchFilter::class, properties={"name":"partial"})
 * @ApiFilter(OrderFilter::class)
 */
class Product
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"products_read", "categories_read", "products_subresource"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"products_read", "categories_read", "products_subresource"})
     */
    private $name;

    /**
     * @ORM\Column(type="float")
     * @Groups({"products_read", "categories_read", "products_subresource"})
     */
    private $price;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="products")
     * @Groups({"products_read"})
     */
    private $category;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"products_read", "categories_read", "products_subresource"})
     */
    private $mainPicture;

    /**
     * @ORM\Column(type="text")
     * @Groups({"products_read", "categories_read", "products_subresource"})
     */
    private $shortDescription;

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

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getMainPicture(): ?string
    {
        return $this->mainPicture;
    }

    public function setMainPicture(string $mainPicture): self
    {
        $this->mainPicture = $mainPicture;

        return $this;
    }

    public function getShortDescription(): ?string
    {
        return $this->shortDescription;
    }

    public function setShortDescription(string $shortDescription): self
    {
        $this->shortDescription = $shortDescription;

        return $this;
    }
    
}