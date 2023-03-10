<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Product;
use Liior\Faker\Prices;
use App\Entity\Category;
use App\Entity\User;
use Bezhanov\Faker\Provider\Commerce;
use Bluemmb\Faker\PicsumPhotosProvider;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    protected $encoder;
    
    public function __construct( UserPasswordHasherInterface $encoder){
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');
        $faker->addProvider(new Prices($faker));
        $faker->addProvider(new Commerce($faker));
        $faker->addProvider(new PicsumPhotosProvider($faker));
        
        for ($i=0; $i < 10; $i++) { 
            $category = new Category();
            $category->setName($faker->department());
            
            $manager->persist($category);
            
            for ($j=0; $j < mt_rand(15, 30); $j++) { 
                $product = New Product();
                $product->setName($faker->productName())
                ->setPrice($faker->price(40, 200))
                ->setCategory($category)
                ->setShortDescription($faker->paragraph())
                ->setMainPicture($faker->imageUrl(400, 400, true));
    
                $manager->persist($product);
            }
        
        }
        
        $admin = new User();
        
        $hash = $this->encoder->hashPassword($admin,"admin");
        
        $admin->setFirstName("admin")
        ->setLastName("admin")
        ->setEmail("admin@gmail.com")
        ->setRoles(['ROLE_ADMIN'])
        ->setPassword($hash);
        $manager->persist($admin);
        
        for ($k=0; $k <5 ; $k++) { 
            $user = new User();
            $hash = $this->encoder->hashPassword($user,"password");
            $user->setEmail("user$k@gmail.com")
            ->setFirstName($faker->firstName())
            ->setLastName($faker->lastName())
            ->setPassword($hash);
            $manager->persist($user);
        }
        $manager->flush();
    }
}