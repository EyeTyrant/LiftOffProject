package com.eyetyrantdesign.collector.controllers;

import com.eyetyrantdesign.collector.models.DieCast;
import com.eyetyrantdesign.collector.models.data.DieCastRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CollectorController {

  @Autowired
  private DieCastRepository dieCastRepository;


  @RequestMapping("")
  @ResponseBody
  public String index(){
    return "index";
  }


  @GetMapping("list")
//  @CrossOrigin(origins = "http://localhost:4200")
  @ResponseBody
  public Iterable<DieCast> listAll(){
    return dieCastRepository.findAll();
  }

  @GetMapping("list/{id}")
//  @CrossOrigin(origins = "http://localhost:4200")
  @ResponseBody
  public Optional<DieCast> getItemById(@PathVariable Integer id){
    return dieCastRepository.findById(id);
  }

  @PostMapping("list")
//  @CrossOrigin(origins = "http://localhost:4200")
  public DieCast addItem(@RequestBody DieCast newDieCast){
    return dieCastRepository.save(newDieCast);
  }

  @DeleteMapping("list/{id}")
//  @CrossOrigin(origins = "http://localhost:4200")
  public void deleteItemById(@PathVariable("id") Integer id) {
   dieCastRepository.deleteById(id);
  }

  @PatchMapping("list/{id}")
//  @CrossOrigin(origins = "http://localhost:4200")
  public DieCast updateItem(@RequestBody DieCast editDieCast) {
    return dieCastRepository.save(editDieCast);
  }
}