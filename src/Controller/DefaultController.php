<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    /**
     * @Route("/", name="frontend")
     */
    public function frontend()
    {
        return $this->render('Frontend/index.html.twig');
    }


    /**
     * @Route("/backend/{reactRouting}", name="backend", defaults={"reactRouting": null})
     */
    public function backend()
    {
        return $this->render('Backend/index.html.twig');
    }
}
