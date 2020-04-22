<?php

class User 
{

    private $id;
    private $name;

    public function __construct(array $_user)
    {
        foreach($this as $property => $value) {
            if(array_key_exists($property, $_user)) {
                
            }
        }
    }
}