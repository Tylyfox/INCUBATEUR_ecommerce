<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @UniqueEntity("email", message="Un utilisateur ayant cette adresse email existe déjà.")
 * @ApiResource(
 *      attributes={
 *          "pagination_enabled"=true,
 *          "pagination_items_per_page"=20,
 *          "order": {"lastName":"asc"}
 *      },
 *       normalizationContext={
 *          "groups"={"users_read"}
 *      },collectionOperations={
 *          "GET"={"path"="/utilisateurs"},
 *          "POST"={"path"="/utilisateurs"}
 *      },
 *      itemOperations={
 *          "GET"={"path"="/utilisateurs/{id}"},
 *          "DELETE"={"path"="/utilisateurs/{id}"},
 *          "PUT"={"path"="/utilisateurs/{id}"},
 *          "PATCH"={"path"="/utilisateurs/{id}"}
 *      }
 * )
 */
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("users_read")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups("users_read")
     * @Assert\NotBlank(message="L'eamil utilisateur est obligatoire.")
     * @Assert\Email(message="l'email '{{ value }}' n'est pas un email valide.")
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     * @Groups("users_read")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Assert\NotBlank(message="Le mot de passe est obligatoire.")
     * @Assert\Regex("/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/", message="Le mot de passe doit contenir au minimum : 8 caractères, 1 Majucule, 1 Chiffre et un caractère spécial")
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("users_read")
     * @Assert\NotBlank(message="Le prénom est obligatoire.")
     * @Assert\Length(min=2, minMessage="Le prénom doit faire entre 2 et 255 caractères.", max=255, maxMessage="Le prénom doit faire entre 2 et 255 caractères.")
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("users_read")
     * @Assert\NotBlank(message="Le nom est obligatoire.")
     * @Assert\Length(min=2, minMessage="Le nom doit faire entre 2 et 255 caractères.", max=255, maxMessage="Le nom doit faire entre 2 et 255 caractères.")
     */
    private $lastName;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @deprecated since Symfony 5.3, use getUserIdentifier instead
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }
}