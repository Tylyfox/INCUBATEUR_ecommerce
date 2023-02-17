<?php

namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber
{

    public function updateJWTCreated(JWTCreatedEvent $event)
    {
        $user = $event->getUser();
        $data = $event->getData();
        
        $data["Prénom"] = $user->getFirstName();
        $data["Nom"] = $user->getLastName();
        
        $event->setData($data);  
    }
}